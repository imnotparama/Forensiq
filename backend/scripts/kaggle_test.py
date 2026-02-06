import kagglehub

path = kagglehub.dataset_download(
    "vangap/indian-supreme-court-judgments"
)

print("Path to dataset files:", path)
