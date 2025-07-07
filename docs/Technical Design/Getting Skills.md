What I am thinking about is my team wants to make their own changes / edits so I will need to keep some external storage.
(From left to right) I will have the first and foremost the data of the roadmap. This is the primary data storage I will be taking from.
As it is the primary one I have decided to put in place a serverless function that queries for edits / changes against the the current state. If there is a edit or a change we can put the edit or change onto a queue which is monitored by another serverless function which takes the edit and then edits our data storage.
![[Pasted image 20250707223421.png]]

Next as we will want the team to be able to make edits instead of attempting to keep track of edits vs updates of the original data I will instead store the edits / new resources that the team suggests in a separate data store (although likely held in the same azure table). These then will served by an API / backend layer in nextjs


![[Pasted image 20250707224530.png]]

![[shapes at 25-07-07 22.54.22.png]]