# Assumptions

1. The guide is authenticated and logged in.
2. Each guide has a unique user ID when they are registered. The front end will pass this user ID when making the teaching availability submission.
3. Data is saved in MongoDB.
4. For the simplicity, it is assumed that the Guide can only select one hour time slots.
5. Time zone is the time zone setup on the server.
6. Guide can only schdule for maximum of 2 hours per session and there should be at least a 30 minutes break between each session.
7. Scheduling can be done only in between 7AM - 10PM.

# Other Details

1. Cloud hosted MongoDB is used to store data.
2. The API runs on express.
3. Data is saved as a single record per week number per Guide.

# Improvements Suggested

1. Add more TypeScript types
