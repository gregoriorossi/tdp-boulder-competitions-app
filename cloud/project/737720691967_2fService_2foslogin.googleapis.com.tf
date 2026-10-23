resource "google_project_service" "oslogin_googleapis_com" {
  project = "737720691967"
  service = "oslogin.googleapis.com"
}
# terraform import google_project_service.oslogin_googleapis_com 737720691967/oslogin.googleapis.com
