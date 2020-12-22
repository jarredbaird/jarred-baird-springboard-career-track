from flask import Flask, request, render_template
from stories import story
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
app.config['SECRET_KEY'] = "oh-so-secret"

debug = DebugToolbarExtension(app)

@app.route('/')
def show_sadlib_form():
    """
    Show greeting form
    This is the home / root page
    """
    prompts = story.prompts

    return render_template("home_form.html", prompts=prompts)

@app.route('/complete-sadlib')
def show_sadlib():
  """
  Take completed form and add it to the sadlib
  Direct route from the home / root page
  """
  
  text = story.generate(request.args)
  
  return render_template("sadlib.html", text=text)