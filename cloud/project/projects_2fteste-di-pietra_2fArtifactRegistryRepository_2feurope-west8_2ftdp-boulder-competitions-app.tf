resource "google_artifact_registry_repository" "tdp_boulder_competitions_app" {
  cleanup_policy_dry_run = true
  format                 = "DOCKER"

  labels = {
    managed-by-cnrm = "true"
  }

  location      = "europe-west8"
  mode          = "STANDARD_REPOSITORY"
  project       = "teste-di-pietra"
  repository_id = "tdp-boulder-competitions-app"
}
# terraform import google_artifact_registry_repository.tdp_boulder_competitions_app projects/teste-di-pietra/locations/europe-west8/repositories/tdp-boulder-competitions-app
