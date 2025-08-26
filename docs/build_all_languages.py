#!/usr/bin/env python3
"""
Multilingual build script
Build all supported language versions
"""

import subprocess
import sys
from pathlib import Path

def run_command(cmd, description):
    """Run command and handle errors"""
    print(f"🔄 {description}...")
    try:
        result = subprocess.run(cmd, shell=True, check=True, capture_output=True, text=True)
        print(f"✅ {description} done")
        return True
    except subprocess.CalledProcessError as e:
        print(f"❌ {description} failed:")
        print(f"Error output: {e.stderr}")
        return False

def main():
    # Ensure running in the correct directory
    if not Path("source/conf.py").exists():
        print("Error: Please run this script in the docs directory")
        sys.exit(1)
    
    print("🚀 Start building all languages...")
    
    # 1. Update translation templates
    if not run_command("sphinx-build -b gettext source/ _build/gettext", "Update translation templates"):
        sys.exit(1)
    
    # 2. Update .po files for all languages
    languages = ["zh_CN"]
    for lang in languages:
        if not run_command(f"sphinx-intl update -p _build/gettext -l {lang}", f"Update translation for {lang}"):
            sys.exit(1)
    
    # 3. Build all language versions
    for lang in ["en"] + languages:
        output_dir = f"_build/html/{lang}"
        if not run_command(f"sphinx-build -b html -D language={lang} source/ {output_dir}", f"Build {lang} version"):
            sys.exit(1)
    
    print("\n🎉 All language versions built successfully!")
    print("\n📁 Build output directories:")
    for lang in ["en"] + languages:
        print(f"  - {lang}: _build/html/{lang}/")
    
    print("\n🌐 Local preview:")
    print("  - English: file://" + str(Path("_build/html/en/index.html").absolute()))
    print("  - Chinese: file://" + str(Path("_build/html/zh_CN/index.html").absolute()))

if __name__ == "__main__":
    main()
