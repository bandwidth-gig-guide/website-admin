# website-admin

This repository defines the content management website for the gig guide.

## Running Locally

```sh
docker compose up -d --build
```

The application is accessible through a reverse proxy on `admin.localhost`:

- Main site: `localhost`
- Admin site: `admin.localhost`

Hot reloading is partially supported. Changes require a browser refresh to appear.