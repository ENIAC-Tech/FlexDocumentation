# Build Documentation Guide

This document explains how to build the FlexDocumentation using PowerShell scripts.

## Prerequisites

- Python 3.11+
- Sphinx and related packages (install via `pip install -r requirements.txt`)
- PowerShell (built-in on Windows)

## Quick Start

All build commands use the `make.ps1` PowerShell script in the `docs` directory.

```powershell
cd docs
.\make.ps1 <target>
```

## Available Targets

### Basic Commands

| Command | Description |
|---------|-------------|
| `.\make.ps1 help` | Show help message with all available targets |
| `.\make.ps1 html` | Build HTML documentation (English only) |
| `.\make.ps1 clean` | Clean the build directory |

### Internationalization (i18n) Commands

| Command | Description |
|---------|-------------|
| `.\make.ps1 gettext` | Extract translatable messages to POT files |
| `.\make.ps1 i18n` | **Update translation catalogs (PO files)** ⭐ |
| `.\make.ps1 multilang` | Build HTML for all languages |
| `.\make.ps1 allhtml` | **One-click: extract, update, and build all** ⭐ |

## Common Workflows

### 1. Build Documentation (English Only)

```powershell
cd docs
.\make.ps1 html
```

Output: `build/html/index.html`

### 2. Update Translation Files

After modifying source documents (.md or .rst files):

```powershell
cd docs
.\make.ps1 i18n
```

This will:
1. Extract translatable messages from source files
2. Update all `.po` files in `source/locales/zh_CN/LC_MESSAGES/`

### 3. Build All Language Versions

```powershell
cd docs
.\make.ps1 multilang
```

Output:
- English: `build/html/en/index.html`
- Chinese: `build/html/zh_CN/index.html`

### 4. Complete Build Pipeline (Recommended)

This is the **one-click solution** for building everything:

```powershell
cd docs
.\make.ps1 allhtml
```

This will:
1. Extract translatable messages
2. Update translation catalogs
3. Build HTML for all languages (English + Chinese)

## Translation Workflow

### Step-by-Step Process

1. **Modify source documents**
   - Edit files in `source/` directory (.md or .rst files)

2. **Update translation files**
   ```powershell
   .\make.ps1 i18n
   ```

3. **Translate content**
   - Open `.po` files in `source/locales/zh_CN/LC_MESSAGES/`
   - Edit the `msgstr` fields with Chinese translations
   - Example:
     ```po
     #: ../../source/index.rst:2
     msgid "Welcome to FlexDocumentation!"
     msgstr "欢迎使用 FlexDocumentation！"
     ```

4. **Build all versions**
   ```powershell
   .\make.ps1 multilang
   ```

5. **Preview**
   - Open `build/html/en/index.html` for English
   - Open `build/html/zh_CN/index.html` for Chinese

## Directory Structure

```
docs/
├── make.ps1                    # Main build script
├── source/                     # Source documentation files
│   ├── conf.py                # Sphinx configuration
│   ├── locales/               # Translation files
│   │   └── zh_CN/
│   │       └── LC_MESSAGES/
│   │           ├── index.po
│   │           ├── getting_started.po
│   │           └── ...
│   ├── *.md                   # Markdown source files
│   └── *.rst                  # reStructuredText source files
└── build/                     # Build output (generated)
    ├── gettext/               # Translation templates (.pot)
    └── html/                  # HTML output
        ├── en/                # English version
        └── zh_CN/             # Chinese version
```

## Troubleshooting

### PowerShell Execution Policy

If you get an error about script execution being disabled:

```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Sphinx Not Found

Make sure Sphinx is installed:

```powershell
pip install -r requirements.txt
```

### Build Errors

Clean the build directory and try again:

```powershell
.\make.ps1 clean
.\make.ps1 allhtml
```

## Tips

- Use `.\make.ps1 i18n` frequently to keep translation files up-to-date
- Use `.\make.ps1 allhtml` when you want to rebuild everything from scratch
- Translation files (`.po`) can be edited with any text editor or specialized tools like Poedit
- Untranslated content will automatically fall back to English

## Adding New Languages

To add support for a new language (e.g., Japanese):

1. Edit `make.ps1` and add the language code to `$LANGUAGES`:
   ```powershell
   $LANGUAGES = @("zh_CN", "ja")
   ```

2. Initialize the new language:
   ```powershell
   .\make.ps1 i18n
   ```

3. Translate the `.po` files in `source/locales/ja/LC_MESSAGES/`

4. Build all versions:
   ```powershell
   .\make.ps1 allhtml
   ```

