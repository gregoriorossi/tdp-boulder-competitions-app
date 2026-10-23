resource "google_project_service" "apphub_googleapis_com" {
  project = "737720691967"
  service = "apphub.googleapis.com"
}
# terraform import google_project_service.apphub_googleapis_com 737720691967/apphub.googleapis.com
