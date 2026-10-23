resource "google_compute_ssl_certificate" "bouldermeetingtdp" {
  name    = "bouldermeetingtdp"
  project = "teste-di-pietra"
}
# terraform import google_compute_ssl_certificate.bouldermeetingtdp projects/teste-di-pietra/global/sslCertificates/bouldermeetingtdp
