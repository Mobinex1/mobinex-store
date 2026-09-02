$root = "C:\Users\PC No 26\mobinex-store"
$listener = [System.Net.HttpListener]::new()
$listener.Prefixes.Add("http://localhost:3000/")

try {
    $listener.Start()
    Write-Host "Mobinex App is running at http://localhost:3000/"

    while ($listener.IsListening) {
        $context = $listener.GetContext()
        $requestPath = [System.Uri]::UnescapeDataString($context.Request.Url.AbsolutePath)

        if ($requestPath -eq "/") {
            $requestPath = "/index.html"
        }

        $fullPath = [System.IO.Path]::GetFullPath((Join-Path $root ($requestPath.TrimStart("/"))))

        if (-not (Test-Path $fullPath -PathType Leaf)) {
            $body = "Not Found"
            $context.Response.StatusCode = 404
            $context.Response.ContentType = "text/plain"
            $bodyBytes = [System.Text.Encoding]::UTF8.GetBytes($body)
            $context.Response.ContentLength64 = $bodyBytes.Length
            $context.Response.OutputStream.Write($bodyBytes, 0, $bodyBytes.Length)
            $context.Response.OutputStream.Close()
            continue
        }

        $extension = [System.IO.Path]::GetExtension($fullPath).ToLowerInvariant()
        $mimeType = switch ($extension) {
            ".html" { "text/html; charset=utf-8" }
            ".css" { "text/css; charset=utf-8" }
            ".js" { "application/javascript; charset=utf-8" }
            ".json" { "application/json; charset=utf-8" }
            ".png" { "image/png" }
            ".jpg" { "image/jpeg" }
            ".jpeg" { "image/jpeg" }
            ".gif" { "image/gif" }
            ".svg" { "image/svg+xml" }
            ".ico" { "image/x-icon" }
            default { "application/octet-stream" }
        }

        $bytes = [System.IO.File]::ReadAllBytes($fullPath)
        $context.Response.ContentType = $mimeType
        $context.Response.ContentLength64 = $bytes.Length
        $context.Response.OutputStream.Write($bytes, 0, $bytes.Length)
        $context.Response.OutputStream.Close()
    }
}
finally {
    $listener.Stop()
    $listener.Close()
}
