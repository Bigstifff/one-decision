from flask import Flask, session, request, jsonify, render_template, redirect
from flask_session import Session
from cs50 import SQL
from organizer import get_tasks

# databse integration 
db = SQL("sqlite:///oneDecision.db")

# app declaration
app = Flask(__name__)

# app session(cookie) configuration
app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        tasks = get_tasks()
        return tasks
    if not session.get("launch"):
        return redirect("/landing")
    return render_template("index.html", page_id="index")

@app.route("/landing", methods=["GET", "POST"])
def landing():
    if request.method == "POST":
        session["launch"] = request.form.get("enter")
        return redirect("/")
    return render_template("landing.html", page_id="landing")

if "__name__" == "__main__":
    app.run(port=8080, use_reloader=True, debug=True, reloader_type="watchdog")