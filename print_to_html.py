#Loops through JSON files for individual cameras, creates valid HTML objects for each camera
#Saves out to individual HTML files, writes JSON file with link to HTML files for JS processing as well
#as coordinates for easier processing in HTML

import urllib
from urllib import urlencode
import json
import requests
import httplib
import HTMLParser
import glob
from pprint import pprint

path = "cam_data/*.json"
output = []
#

for files in glob.glob(path):
	
	site_data = open(files)
	site_json = json.load(site_data)

	divpre = '''<div id="vid_container"><div class="videoWrapper">\n'''
	prestring = '''<object type="application/x-shockwave-flash" id="movie" name="movie" data="http://www.earthcam.com/swf/cam_player_v2/ecnPlayer.swf?20140120" width="960" height="480" style="height: 480px; width: 960px;"><param name="bgcolor" value="#FFFFFF"><param name="wmode" value="transparent"><param name="allowFullScreen" value="true"><param name="allowScriptAccess" value="always"><param name="flashvars" value="hidebanner=true&amp;'''
	camname = site_json[0]['flashvars.cam']
	string1 = '''cam=''' + camname + '''&amp;json='''
	mainstring = site_json[2]['flashvars.json_string']
	poststring = '''"></object>\n'''
	divpost = '''</div></div>\n\n'''
	html_obj = divpre + prestring + string1 + mainstring + poststring + divpost


	htmlpath = 'cam_html/' + str(camname) + '.html'
	html_file = open(htmlpath,'w')

	#grabbing coordinates to include
	camname_temp = site_json[1]['flashvars.json']['cam'].keys()[0]
	coords = site_json[1]['flashvars.json']['cam'][camname_temp]['coords']
	latitude = coords.split(",")[0]
	longitude = coords.split(",")[1]


	output.append({'htmlfile':htmlpath, 'lat':latitude, 'lon':longitude})
	html_file.write(html_obj)
	html_file.close()

with open('htmlfiles.json', 'w') as outfile:
	json.dump(output,outfile)

