resource "google_project_service" "serviceusage_googleapis_com" {
  project = "737720691967"
  service = "serviceusage.googleapis.com"
}
# terraform import google_project_service.serviceusage_googleapis_com 737720691967/serviceusage.googleapis.com
