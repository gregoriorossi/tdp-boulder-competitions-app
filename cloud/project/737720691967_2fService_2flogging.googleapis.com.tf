resource "google_project_service" "logging_googleapis_com" {
  project = "737720691967"
  service = "logging.googleapis.com"
}
# terraform import google_project_service.logging_googleapis_com 737720691967/logging.googleapis.com
