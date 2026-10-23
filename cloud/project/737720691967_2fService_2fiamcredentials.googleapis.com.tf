resource "google_project_service" "iamcredentials_googleapis_com" {
  project = "737720691967"
  service = "iamcredentials.googleapis.com"
}
# terraform import google_project_service.iamcredentials_googleapis_com 737720691967/iamcredentials.googleapis.com
