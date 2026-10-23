resource "google_project_service" "servicemanagement_googleapis_com" {
  project = "737720691967"
  service = "servicemanagement.googleapis.com"
}
# terraform import google_project_service.servicemanagement_googleapis_com 737720691967/servicemanagement.googleapis.com
