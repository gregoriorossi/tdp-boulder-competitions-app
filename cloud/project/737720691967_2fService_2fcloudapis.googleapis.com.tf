resource "google_project_service" "cloudapis_googleapis_com" {
  project = "737720691967"
  service = "cloudapis.googleapis.com"
}
# terraform import google_project_service.cloudapis_googleapis_com 737720691967/cloudapis.googleapis.com
