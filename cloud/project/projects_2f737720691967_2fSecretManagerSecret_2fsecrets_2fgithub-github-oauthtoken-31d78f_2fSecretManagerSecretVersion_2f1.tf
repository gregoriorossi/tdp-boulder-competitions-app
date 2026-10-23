resource "google_secret_manager_secret_version" "1" {
  deletion_policy = "DELETE"
  enabled         = true
  secret          = "projects/737720691967/secrets/github-github-oauthtoken-31d78f"
  secret_data     = ""
}
# terraform import google_secret_manager_secret_version.1 projects/737720691967/secrets/github-github-oauthtoken-31d78f/versions/1
