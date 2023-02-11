from flask import Flask
from dotenv import load_dotenv
import os

load_dotenv()


app = Flask(__name__)

from api.clusters import routes

app.register_blueprint(routes.cluster_bp, url_prefix='/api/v1/cluster')

app.run(port=os.environ["PORT"])