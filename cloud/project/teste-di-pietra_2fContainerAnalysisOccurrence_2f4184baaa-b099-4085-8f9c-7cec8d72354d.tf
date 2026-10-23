resource "google_container_analysis_occurrence" "4184baaa_b099_4085_8f9c_7cec8d72354d" {
  attestation {
    serialized_payload = "eyJjcml0aWNhbCI6eyJpZGVudGl0eSI6eyJkb2NrZXItcmVmZXJlbmNlIjoiZXVyb3BlLXdlc3Q4LWRvY2tlci5wa2cuZGV2L3Rlc3RlLWRpLXBpZXRyYS90ZHAtY29tcGV0aXRpb25zL3RkcC1jb21wZXRpdGlvbnMifSwiaW1hZ2UiOnsiZG9ja2VyLW1hbmlmZXN0LWRpZ2VzdCI6InNoYTI1Njo4NjBlZDg5NWRiODgxNWRlZjNlMmVjOWZmYjEwMjBjN2FlZjQwNjRhMDQ5M2I0OGUxMDlkZDlmZTdjZTNiYjg5In0sInR5cGUiOiJHb29nbGUgY2xvdWQgYmluYXV0aHogY29udGFpbmVyIHNpZ25hdHVyZSJ9fQ=="

    signatures {
      public_key_id = "//cloudkms.googleapis.com/v1/projects/verified-builder/locations/global/keyRings/attestor/cryptoKeys/builtByGCB/cryptoKeyVersions/1"
      signature     = "MEQCIEtTE6UelEHOGZ6yVxC1liAXiAkB8ZYhnAfnl8lDRzMyAiB4tZv9gSqNMDqMqQmKQkf607YGT5COW3okuv6zkW05iw=="
    }
  }

  note_name    = "projects/teste-di-pietra/notes/built-by-cloud-build"
  project      = "teste-di-pietra"
  resource_uri = "europe-west8-docker.pkg.dev/teste-di-pietra/tdp-competitions/tdp-competitions@sha256:860ed895db8815def3e2ec9ffb1020c7aef4064a0493b48e109dd9fe7ce3bb89"
}
# terraform import google_container_analysis_occurrence.4184baaa_b099_4085_8f9c_7cec8d72354d projects/teste-di-pietra/occurrences/4184baaa-b099-4085-8f9c-7cec8d72354d
