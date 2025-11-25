---
description: How to update GitHub repository to trigger Vercel deployment
---

This workflow describes how to commit and push your local changes to GitHub, which will automatically trigger a new deployment on Vercel.

1. Check the status of your files to see what has changed.
```bash
git status
```

2. Stage all your changes for the commit.
```bash
git add .
```

3. Commit your changes with a descriptive message.
```bash
git commit -m "Fix: Map z-index, Submit Idea dialog, and Digital Twin validation"
```

4. Push your changes to the remote repository (GitHub).
```bash
git push
```

> [!NOTE]
> Once the push is successful, go to your Vercel dashboard to see the new deployment building.
