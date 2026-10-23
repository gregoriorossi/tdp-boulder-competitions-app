resource "google_project_service" "cloudbuild_googleapis_com" {
  project = "737720691967"
  service = "cloudbuild.googleapis.com"
}
# terraform import google_project_service.cloudbuild_googleapis_com 737720691967/cloudbuild.googleapis.com
