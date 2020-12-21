from flask import Flask, request, render_template
from stories import Story
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

s = Story(["noun", "verb"], 
          "I love to {verb} a good {noun}.")

@app.route('/')
def show_madlib_form():
    """
    Show greeting form
    This is the home / root page
    """

    return render_template("home_form.html")

@app.route('/complete-sadlib')
def show_sadlib():
  """
  Take completed form and add it to the sadlib
  Direct route from the home / root page
  """
  
  return render_template("sadlib.html")