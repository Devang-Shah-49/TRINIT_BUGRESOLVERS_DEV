from flask import Blueprint, request
from .cluster import Clustering
import pandas as pd
import numpy as np
from bson.objectid import ObjectId
from pymongo import ReturnDocument
from db import db

mongoClient = db.get_database()

cluster_bp = Blueprint(
    'cluster_bp', __name__,
)


@cluster_bp.route('/data', methods=["POST"])
def uploadData():
    try:
        userid = request.form["userid"]
        datatype = request.form["datatype"]
        df = []
        print(request.files["data"].filename.split('.')[-1])
        if request.files["data"].filename.split('.')[-1] == 'csv':
            df = pd.read_csv(request.files["data"])
        else:
            df = pd.read_excel(request.files["data"])

        schema = list(zip(df.columns.tolist(), datatype.split(',')))

        dataset = df.to_numpy().tolist()

        # PRE PROCESSING

        data = {
            'userid': userid,
            'schema': schema,
            'data': dataset
        }

        result = mongoClient["data"].insert_one(data)

        return {'message': result.acknowledged, 'status': 200}

    except Exception as Argument:
        print(Argument)
        return Argument


@cluster_bp.route('/formation', methods=["POST"])
def getCluster():
    try:
        dataid = request.json["dataid"]
        num_of_means = request.json["num_of_means"]
        attr_idx = request.json["attr_idx"]
        num_of_iter = request.json["num_of_iter"]

        dataset = mongoClient["data"].find_one({
            '_id': ObjectId(dataid)
        })

        cluster = Clustering(num_of_means=num_of_means,
                             schema=dataset['schema'])
        cluster.addData(dataset["data"])

        res = cluster.findClusters(attr_idxs=attr_idx, num_of_iter=num_of_iter)

        return res

    except Exception as Argument:
        print(Argument)
        return Argument


@cluster_bp.route('/data', methods=["PATCH"])
def updateData():
    try:
        dataid = request.json["dataid"]
        num_of_means = request.json["num_of_means"]
        attr_idx = request.json["attr_idx"]
        num_of_iter = request.json["num_of_iter"]
        new_data = request.json["new_data"]

        dataset = mongoClient["data"].find_one({
            '_id': ObjectId(dataid)
        })

        dataset["data"].append(new_data)

        print(dataset["data"])

        dataset = mongoClient["data"].update_one({
            '_id': ObjectId(dataid)
        },
        {
            # {'$set': {"data": dataset["data"]}},
            # {'$push': {'data':new_data}}
            {'$push': {'data': new_data}}
        })

        cluster = Clustering(num_of_means=num_of_means,
                             schema=dataset['schema'])
        cluster.addData(dataset["data"])

        res = cluster.findClusters(attr_idxs=attr_idx, num_of_iter=num_of_iter)

        return res

    except Exception as Argument:
        print(Argument)
        return Argument


@cluster_bp.route('/test', methods=["GET"])
def cluster_test():
    try:
        df = pd.read_csv('test.csv')
        df["Test-1"] = [1, 2, 3, 1]
        df["Test-2"] = [3, 1, 2, 3]
        # df
        schema = []
        schema.append([df.columns[0], 'NOMINAL'])
        schema.append([df.columns[1], 'BINARY SYMMETRIC'])
        schema.append([df.columns[2], 'ORDINAL'])
        schema.append([df.columns[3], 'INTERVAL'])

        cluster = Clustering(num_of_means=2, schema=schema)
        for index, row in df.iterrows():
            cluster.updateData(list(np.array(row)))
        return cluster.findClusters(5, [1, 2, 3])
    except Exception as Argument:
        print(Argument)
        return Argument
