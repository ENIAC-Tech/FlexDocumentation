# Sphinx Documentation Build Script for FlexDocumentation
# PowerShell version

param(
    [Parameter(Position=0)]
    [string]$Target = "help"
)

# Configuration
$SPHINXBUILD = "sphinx-build"
$SOURCEDIR = "source"
$BUILDDIR = "build"
$GETTEXTDIR = "$BUILDDIR/gettext"
$LANGUAGES = @("zh_CN")

# Change to script directory
Push-Location $PSScriptRoot

function Show-Help {
    Write-Host ""
    Write-Host "Available targets:" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "  help       " -NoNewline -ForegroundColor Yellow
    Write-Host "- Show this help message"
    Write-Host "  html       " -NoNewline -ForegroundColor Yellow
    Write-Host "- Build HTML documentation (English only)"
    Write-Host "  clean      " -NoNewline -ForegroundColor Yellow
    Write-Host "- Clean build directory"
    Write-Host ""
    Write-Host "  gettext    " -NoNewline -ForegroundColor Green
    Write-Host "- Extract translatable messages to POT files"
    Write-Host "  i18n       " -NoNewline -ForegroundColor Green
    Write-Host "- Update translation catalogs (PO files)"
    Write-Host "  multilang  " -NoNewline -ForegroundColor Green
    Write-Host "- Build HTML for all languages"
    Write-Host "  allhtml    " -NoNewline -ForegroundColor Green
    Write-Host "- Extract, update translations, and build all languages"
    Write-Host ""
    Write-Host "Examples:" -ForegroundColor Cyan
    Write-Host "  .\make.ps1 html       " -NoNewline
    Write-Host "- Build English documentation"
    Write-Host "  .\make.ps1 i18n       " -NoNewline
    Write-Host "- Update translation files"
    Write-Host "  .\make.ps1 allhtml    " -NoNewline
    Write-Host "- One-click build all languages"
    Write-Host ""
}

function Build-Gettext {
    Write-Host "Extracting translatable messages..." -ForegroundColor Cyan
    & $SPHINXBUILD -b gettext $SOURCEDIR $GETTEXTDIR
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: Failed to extract messages" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Write-Host "Message extraction complete. Output is in $GETTEXTDIR" -ForegroundColor Green
}

function Update-I18n {
    Write-Host "Updating translation catalogs..." -ForegroundColor Cyan
    Write-Host ""
    
    Build-Gettext
    Write-Host ""
    
    foreach ($lang in $LANGUAGES) {
        Write-Host "Updating $lang translations..." -ForegroundColor Yellow
        sphinx-intl update -p $GETTEXTDIR -l $lang
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Warning: Failed to update $lang translations" -ForegroundColor Yellow
        }
    }
    Write-Host ""
    Write-Host "Translation catalogs updated successfully!" -ForegroundColor Green
    Write-Host "Translation files are in: $SOURCEDIR/locales/" -ForegroundColor Cyan
}

function Build-Multilang {
    Write-Host "Building HTML documentation for all languages..." -ForegroundColor Cyan
    Write-Host ""
    
    # Build English version
    Write-Host "Building English version..." -ForegroundColor Yellow
    & $SPHINXBUILD -b html -D language=en $SOURCEDIR "$BUILDDIR/html/en"
    if ($LASTEXITCODE -ne 0) {
        Write-Host "Error: English build failed" -ForegroundColor Red
        Pop-Location
        exit 1
    }
    Write-Host "English build complete" -ForegroundColor Green
    Write-Host ""
    
    # Build other languages
    foreach ($lang in $LANGUAGES) {
        Write-Host "Building $lang version..." -ForegroundColor Yellow
        & $SPHINXBUILD -b html -D language=$lang $SOURCEDIR "$BUILDDIR/html/$lang"
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Error: $lang build failed" -ForegroundColor Red
            Pop-Location
            exit 1
        }
        Write-Host "$lang build complete" -ForegroundColor Green
        Write-Host ""
    }
    
    Write-Host "All language builds complete!" -ForegroundColor Green
    Write-Host ""
    Write-Host "Output locations:" -ForegroundColor Cyan
    Write-Host "  English: $BUILDDIR/html/en/index.html"
    foreach ($lang in $LANGUAGES) {
        Write-Host "  $lang`: $BUILDDIR/html/$lang/index.html"
    }
}

function Build-AllHtml {
    Write-Host "Building complete multilingual documentation..." -ForegroundColor Cyan
    Write-Host ""
    
    Write-Host "Step 1: Extracting translatable messages..." -ForegroundColor Magenta
    Build-Gettext
    Write-Host ""
    
    Write-Host "Step 2: Updating translation catalogs..." -ForegroundColor Magenta
    foreach ($lang in $LANGUAGES) {
        Write-Host "Updating $lang translations..." -ForegroundColor Yellow
        sphinx-intl update -p $GETTEXTDIR -l $lang
        if ($LASTEXITCODE -ne 0) {
            Write-Host "Warning: Failed to update $lang translations" -ForegroundColor Yellow
        }
    }
    Write-Host ""
    
    Write-Host "Step 3: Building HTML for all languages..." -ForegroundColor Magenta
    Build-Multilang
}

function Build-Html {
    Write-Host "Building HTML documentation (English only)..." -ForegroundColor Cyan
    & $SPHINXBUILD -M html $SOURCEDIR $BUILDDIR
    if ($LASTEXITCODE -eq 0) {
        Write-Host ""
        Write-Host "Build complete. Output is in $BUILDDIR/html/" -ForegroundColor Green
    }
}

function Clean-Build {
    Write-Host "Cleaning build directory..." -ForegroundColor Cyan
    if (Test-Path $BUILDDIR) {
        Remove-Item -Recurse -Force $BUILDDIR
        Write-Host "Build directory cleaned" -ForegroundColor Green
    } else {
        Write-Host "Build directory does not exist" -ForegroundColor Yellow
    }
}

# Main execution
switch ($Target.ToLower()) {
    "help" {
        Show-Help
    }
    "html" {
        Build-Html
    }
    "clean" {
        Clean-Build
    }
    "gettext" {
        Build-Gettext
    }
    "i18n" {
        Update-I18n
    }
    "multilang" {
        Build-Multilang
    }
    "allhtml" {
        Build-AllHtml
    }
    default {
        Write-Host "Unknown target: $Target" -ForegroundColor Red
        Write-Host ""
        Show-Help
        Pop-Location
        exit 1
    }
}

Pop-Location

