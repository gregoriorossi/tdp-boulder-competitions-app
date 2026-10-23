resource "google_project_service" "secretmanager_googleapis_com" {
  project = "737720691967"
  service = "secretmanager.googleapis.com"
}
# terraform import google_project_service.secretmanager_googleapis_com 737720691967/secretmanager.googleapis.com
