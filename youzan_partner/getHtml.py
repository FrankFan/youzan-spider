#coding=utf-8

import urllib

def getHtml(url):
	page = urllib.urlopen(url)
	html = page.read()
	return html

def getInfo(html):
	reg = r''

html = getHtml("http://fuwu.youzan.com/detail?id=2");

print html