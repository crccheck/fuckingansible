gh-pages:
# delete and recreate the existing "gh-pages" branch
	-git branch -D gh-pages 2>/dev/null
	git checkout -b gh-pages
# create static files:
	grunt build
# add them to the repo (wouldn't normally do this)
	git add -f fuckinga.*
	git commit -m "deploy to gh-pages"
# have to use `-f` because you're not deploying master:
	git push origin -f gh-pages
	git checkout -
	git branch -D gh-pages
