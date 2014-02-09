#Takes urls of cameras on Earthcam network and gets HTML content then extracts the 
#relevant data to create JSON objects that we can parse to create HTML elements to load into Sunrise

import urllib
import json
import requests
import httplib
import HTMLParser
from pprint import pprint

url_data = open('urls.json')
url_json = json.load(url_data)

for item in url_json:
	output = []
	print item['url']

	r = requests.get(item['url'])

	#Grab flashvars from content
	html_content = r.content
	starting_point = html_content.find("flashvars.json")
	str1 = html_content[starting_point:]
	quote_start = str1.find("\"")
	str2 = str1[quote_start+1:]
	ending_point = str2.find("\"")
	flashvars = str2[:ending_point]
	newf = urllib.unquote(flashvars)
	json_obj = json.loads(newf)
	cams = json_obj['cam']

	#Extract name for JSON filename
	group_id =  cams[cams.keys()[0]]['group_id']

	#Grab main cam name from content
	starting_point = html_content.find("flashvars.cam")
	str1 = html_content[starting_point:]
	quote_start = str1.find("\"")
	str2 = str1[quote_start+1:]
	ending_point = str2.find("\"")
	flashcam = str2[:ending_point]
	flashcam = urllib.unquote(flashcam)

	output.append({'flashvars.cam':flashcam})
	output.append({'flashvars.json':json_obj})
	output.append({'flashvars.json_string':flashvars})

	#Output to json file for each camera URL
	with open(str(group_id) + '.json', 'w') as outfile:
		json.dump(output,outfile)
