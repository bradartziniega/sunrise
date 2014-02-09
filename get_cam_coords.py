#Open JSON files and print out the camera and coordinates
#Used to generate CSV file -> KML just for visual

import json
import glob
import csv

path = "cam_data/*.json"

for files in glob.glob(path):
	
	site_data = open(files)
	site_json = json.load(site_data)
	camname = site_json[1]['flashvars.json']['cam'].keys()[0]
	coords = site_json[1]['flashvars.json']['cam'][camname]['coords']
	
	print camname + ', ' + coords