from flask import Blueprint
from .cluster import Clustering
import pandas as pd
import numpy as np

cluster_bp = Blueprint(
    'cluster_bp', __name__,
)

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