resource "google_project_service" "containerregistry_googleapis_com" {
  project = "737720691967"
  service = "containerregistry.googleapis.com"
}
# terraform import google_project_service.containerregistry_googleapis_com 737720691967/containerregistry.googleapis.com
