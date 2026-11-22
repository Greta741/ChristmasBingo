$ErrorActionPreference = 'Stop'
Add-Type -AssemblyName System.Drawing

$projectRoot = Split-Path -Parent $PSScriptRoot
$publicRoot = Join-Path $projectRoot 'public'
$iconsRoot = Join-Path $publicRoot 'icons'
[System.IO.Directory]::CreateDirectory($iconsRoot) | Out-Null
$logoDocument = [xml](Get-Content -LiteralPath (Join-Path $publicRoot 'logo.svg') -Raw)
$imageData = $logoDocument.DocumentElement.FirstChild.GetAttribute('href')
$imageBytes = [Convert]::FromBase64String($imageData.Substring($imageData.IndexOf(',') + 1))
$sourceStream = [System.IO.MemoryStream]::new($imageBytes, $false)
$sourceImage = [System.Drawing.Bitmap]::new($sourceStream)

# Trim only fully transparent outer pixels, preserving the complete artwork.
$left = $sourceImage.Width
$top = $sourceImage.Height
$right = -1
$bottom = -1
for ($y = 0; $y -lt $sourceImage.Height; $y++) {
    for ($x = 0; $x -lt $sourceImage.Width; $x++) {
        if ($sourceImage.GetPixel($x, $y).A -gt 0) {
            $left = [Math]::Min($left, $x)
            $top = [Math]::Min($top, $y)
            $right = [Math]::Max($right, $x)
            $bottom = [Math]::Max($bottom, $y)
        }
    }
}
if ($right -lt $left) { throw 'The logo contains no visible pixels.' }
$sourceBounds = [System.Drawing.Rectangle]::new($left, $top, $right - $left + 1, $bottom - $top + 1)

function Write-AppIcon([string]$Name, [int]$Size) {
    $bitmap = [System.Drawing.Bitmap]::new($Size, $Size, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
    $graphics = [System.Drawing.Graphics]::FromImage($bitmap)
    try {
        $graphics.Clear([System.Drawing.Color]::Transparent)
        $graphics.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
        $scale = $Size / [double][Math]::Max($sourceBounds.Width, $sourceBounds.Height)
        $width = [int][Math]::Round($sourceBounds.Width * $scale)
        $height = [int][Math]::Round($sourceBounds.Height * $scale)
        $destination = [System.Drawing.Rectangle]::new(
            [int][Math]::Floor(($Size - $width) / 2),
            [int][Math]::Floor(($Size - $height) / 2),
            $width,
            $height
        )
        $graphics.DrawImage($sourceImage, $destination, $sourceBounds, [System.Drawing.GraphicsUnit]::Pixel)
        $bitmap.Save((Join-Path $iconsRoot $Name), [System.Drawing.Imaging.ImageFormat]::Png)
    }
    finally {
        $graphics.Dispose()
        $bitmap.Dispose()
    }
}

try {
    Write-AppIcon 'icon-transparent-192.png' 192
    Write-AppIcon 'icon-transparent-512.png' 512
    Write-AppIcon 'apple-touch-icon-transparent-180.png' 180
    Write-AppIcon 'apple-touch-icon-transparent-167.png' 167
    Write-AppIcon 'apple-touch-icon-transparent-152.png' 152
    Write-AppIcon 'apple-touch-icon-transparent-120.png' 120
}
finally {
    $sourceImage.Dispose()
    $sourceStream.Dispose()
}
