import random
import numpy as np
from difflib import SequenceMatcher
import pusher
import os
from dotenv import load_dotenv

load_dotenv()


class Clustering():
    def __init__(self, num_of_means, schema):
        self.num_of_means = num_of_means
        self.data = []
        self.schema = schema
        self.cluster = {}
        self.pusher_client = pusher.Pusher(
            app_id=os.environ["PUSHER_APP_ID"],
            key=os.environ["PUSHER_KEY"],
            secret=os.environ["PUSHER_SECRET"],
            cluster=os.environ["PUSHER_CLUSTER"],
            ssl=True
        )

    def addData(self, data):
        self.data = data

    def updateData(self, row):
        self.data.append(row)

    def generateDistanceMatrix(self, f, type):
        D = np.zeros((len(self.data), len(self.data)))
        if type == "INTERVAL":
            high = self.data[0][f]
            low = self.data[0][f]
            for i in range(1, len(self.data)):
                high = max(high, self.data[i][f])
                low = min(low, self.data[i][f])
            for i in range(len(self.data)):
                for j in range(len(self.data)):
                    D[i][j] = np.abs(self.data[i][f] -
                                     self.data[j][f])/(high-low)
        elif type == "RATIO":
            for i in range(len(self.data)):
                for j in range(len(self.data)):
                    D[i][j] = np.abs(np.log10(self.data[i][f]) -
                                     np.log10(self.data[j][f]))
        elif type == "NOMINAL":
            for i in range(len(self.data)):
                for j in range(len(self.data)):
                    D[i][j] = SequenceMatcher(
                        None, self.data[i][f], self.data[j][f]).ratio()
        elif type == "BINARY SYMMETRIC":
            for i in range(len(self.data)):
                for j in range(len(self.data)):
                    if self.data[i][f] != self.data[j][f]:
                        D[i][j] = 1
        elif type == "BINARY ASYMMETRIC":
            for i in range(len(self.data)):
                for j in range(len(self.data)):
                    if self.data[i][f] != self.data[j][f]:
                        D[i][j] = 1
        elif type == "ORDINAL":
            Mf = self.data[0][f]
            for i in range(1, len(self.data)):
                Mf = max(Mf, self.data[i][f])
            for i in range(len(self.data)):
                for j in range(len(self.data)):
                    zif = (self.data[i][f]-1)/(Mf-1)
                    zjf = (self.data[j][f]-1)/(Mf-1)
                    D[i][j] = np.abs(zif - zjf)
        return D

    def generateMixedMatrix(self, attr_idxs):
        DFULL = []
        D = np.zeros((len(self.data), len(self.data)))
        for i in range(len(attr_idxs)):
            DFULL.append(self.generateDistanceMatrix(
                attr_idxs[i], self.schema[attr_idxs[i]][1]))
        for i in range(len(self.data)):
            for j in range(len(self.data)):
                num = 0
                den = 0
                for f in range(len(attr_idxs)):
                    if not (self.schema[attr_idxs[f]][1] == "BINARY ASYMMETRIC" and self.data[i][attr_idxs[f]] == self.data[j][attr_idxs[f]] == 0):
                        num += DFULL[f][i][j]
                        den += 1
                if den != 0:
                    D[i][j] = num/den
        return D

    def findClusters(self, num_of_iter, attr_idxs):
        D = self.generateMixedMatrix(attr_idxs)
        final_li = []
        fin_li = []
        while num_of_iter > 0:
            initial = {}
            st = set()
            while (len(st) < self.num_of_means):
                val = random.randint(0, len(self.data)-1)
                st.add(val)
            list_1 = list(st)
            for k in range(self.num_of_means):
                initial.setdefault(list_1[k], [])
            for k in range(self.num_of_means):
                initial[list_1[k]] = [list_1[k]]
            for i in range(len(self.data)):
                # ls = []
                f = list(initial.keys())[0]
                ls = D[i][f]
                min_dist_clust = f
                for k in initial.keys():
                    if D[i][k] < ls:
                        min_dist_clust = k
                if i not in initial[min_dist_clust]:
                    initial[min_dist_clust].append(i)
            # print(initial)
            #### PUSHER ####
            # self.pusher_client.trigger(
            #     'clustering',
            #     'iter_cluster',
            #     initial
            # )
            fin_li.append(initial)
            num_of_iter = num_of_iter-1
            for z, l in initial.items():
                cost = 0.0
                for e in l:
                    cost += D[z][e]
            final_li.append(cost)
        r = np.argmin(final_li)
        op = fin_li[r]
        # print(final_li, op)
        self.cluster = op
        #### PUSHER ####
        # self.pusher_client.trigger(
        #     'clustering',
        #     'final_cluster',
        #     op
        # )
        return op
