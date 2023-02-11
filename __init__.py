from flask import Flask
from dotenv import load_dotenv
import os
from api.clusters import routes as cluster_routes
from api.users import routes as users_routes
import db

load_dotenv()

app = Flask(__name__)

app.register_blueprint(cluster_routes.cluster_bp, url_prefix='/api/v1/cluster')
app.register_blueprint(users_routes.users_bp, url_prefix='/api/v1/user')

app.run(port=os.environ["PORT"])