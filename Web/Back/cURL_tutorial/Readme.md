 # Guide to Using cURL for API Testing

cURL is a command-line tool used to transfer data to or from a server. It supports various protocols such as HTTP, HTTPS, FTP, IMAP, POP3, SMTP, and more. This guide will focus on how to use cURL for testing APIs.

## Table of Contents
1. [Basic Usage](#basic-usage)
2. [GET Requests](#get-requests)
3. [POST Requests](#post-requests)
4. [PUT Requests](#put-requests)
5. [DELETE Requests](#delete-requests)
6. [Headers](#headers)
7. [Authentication](#authentication)
8. [JSON Data](#json-data)
9. [Error Handling](#error-handling)

<a name="basic-usage"></a>
## Basic Usage
To make an HTTP request with cURL, simply type `curl` followed by the URL:
```bash
curl https://api.example.com
```
This sends a GET request to the specified URL. To specify a different request method, use the `-X` flag:
```bash
curl -X POST https://api.example.com
```
You can also redirect output to a file using the `>` operator:
```bash
curl https://api.example.com > response.txt
```
<a name="get-requests"></a>
## GET Requests
By default, cURL sends a GET request. You can add query parameters to the URL using the standard `?key=value&anotherKey=anotherValue` format:
```bash
curl https://api.example.com/items?category=electronics&sort=price
```
<a name="post-requests"></a>
## POST Requests
To send a JSON payload in a POST request, use the `-d` (or `--data`) flag followed by the JSON string enclosed in single quotes:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe", "email": "[john.doe@example.com](mailto:john.doe@example.com)"}' \
  https://api.example.com/users
```

You can use cURL to post a JSON file. Use the `@` symbol followed by the path to the JSON file after the `-d` (or `--data`) flag. Make sure to also set the appropriate content type header to `application/json`.

Here's an example:

Suppose we have a JSON file named `user.json` containing the following data:
```json
{
    "name": "John Doe",
    "email": "[johndoe@example.com](mailto:johndoe@example.com)",
    "role": "admin"
}
```

You can post this data to an API endpoint using the following cURL command:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d @./user.json \
  https://api.example.com/users
```
In this example, replace `https://api.example.com/users` with the actual API endpoint where you want to post the JSON data.

<a name="put-requests"></a>
## PUT Requests
A PUT request is similar to a POST request, but it's typically used to update existing resources instead of creating new ones. Here's an example:
```bash
curl -X PUT \
  -H "Content-Type: application/json" \
  -d '{"name":"Jane Doe", "email": "[jane.doe@example.com](mailto:jane.doe@example.com)"}' \
  https://api.example.com/users/123
```
<a name="delete-requests"></a>
## DELETE Requests
To delete a resource, you can use the DELETE method like this:
```bash
curl -X DELETE https://api.example.com/users/123
```
<a name="headers"></a>
## Headers
You can include custom headers in your requests using the `-H` (or `--header`) flag:
```bash
curl -X GET \
  -H "Authorization: Bearer <token>" \
  https://api.example.com/protected-resource
```
<a name="authentication"></a>
## Authentication
For authenticated endpoints, you may need to pass credentials in the header or body depending on the authentication mechanism used. For basic auth, use the following format:
```bash
curl -u username:password https://api.example.com/protected-resource
```
Or if you have an access token, set it in the authorization header like so:
```bash
curl -X GET \
  -H "Authorization: Bearer <access_token>" \
  https://api.example.com/protected-resource
```
<a name="json-data"></a>
## JSON Data
When sending JSON data, always remember to set the Content-Type header appropriately:
```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -d '{"title":"Example Title", "body":"Example Body"}' \
  https://jsonplaceholder.typicode.com/posts
```
<a name="error-handling"></a>
## Error Handling
If you want cURL to fail when receiving non-successful responses (i.e., HTTP status codes other than 2xx), use the `-f` (or `--fail`) option:
```bash
curl -X GET -f https://api.example.com/not-found
```
This returns a non-zero exit code that can be useful in scripts.