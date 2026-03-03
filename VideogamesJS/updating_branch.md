# Updating the cloned repository

To get the changes in the **main** branch into your local copy:

## Using stash

```bash
git stash

git pull origin main

git stash pop
```

## Using a branch

```bash
git switch <your-branch>

git pull origin main
```

## If you have conflicts

- Open the files that are indicated to have a merge conflict
- Edit them to solve the conflicts
- Do `git add` on those files, to save the changes
