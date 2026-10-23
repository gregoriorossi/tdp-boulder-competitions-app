resource "google_secret_manager_secret" "github_github_oauthtoken_31d78f" {
  labels = {
    managed-by-cnrm = "true"
  }

  project = "737720691967"

  replication {
    user_managed {
      replicas {
        location = "europe-west8"
      }
    }
  }

  secret_id = "github-github-oauthtoken-31d78f"
}
# terraform import google_secret_manager_secret.github_github_oauthtoken_31d78f projects/737720691967/secrets/github-github-oauthtoken-31d78f
