#!/usr/bin/env python3
"""
Translation quality check script
Check the number of untranslated entries to ensure translation quality
"""

import os
import subprocess
import sys
from pathlib import Path

def count_untranslated_entries(po_file):
    """Count the number of untranslated entries in a .po file"""
    try:
        result = subprocess.run(
            ['msgattrib', '--untranslated', str(po_file)],
            capture_output=True,
            text=True,
            check=True
        )
        # Count the number of msgid lines (untranslated entries)
        untranslated_count = result.stdout.count('msgid "')
        return untranslated_count
    except subprocess.CalledProcessError:
        print(f"Warning: Failed to process file {po_file}")
        return 0
    except FileNotFoundError:
        print("Error: 'msgattrib' command not found, please install gettext")
        return -1

def main():
    locales_dir = Path("source/locales")
    if not locales_dir.exists():
        print("Error: 'locales' directory not found")
        sys.exit(1)
    
    # Check Chinese translation
    zh_cn_dir = locales_dir / "zh_CN" / "LC_MESSAGES"
    if not zh_cn_dir.exists():
        print("Error: Chinese translation directory not found")
        sys.exit(1)
    
    print("Checking Chinese translation quality...")
    
    # Check key files
    key_files = [
        "index.po",
        "getting_started.po",
        "flexdesigner/getting_started.po"
    ]
    
    total_untranslated = 0
    failed_files = []
    
    for po_file in key_files:
        file_path = zh_cn_dir / po_file
        if file_path.exists():
            untranslated = count_untranslated_entries(file_path)
            if untranslated == -1:
                sys.exit(1)
            
            print(f"{po_file}: {untranslated} untranslated entries")
            total_untranslated += untranslated
            
            # If untranslated entries exceed the threshold, mark as failed
            if untranslated > 20:  # Threshold can be adjusted
                failed_files.append(po_file)
        else:
            print(f"Warning: File not found {po_file}")
    
    print(f"\nTotal untranslated entries: {total_untranslated}")
    
    if failed_files:
        print(f"\n❌ The following files have too many untranslated entries: {', '.join(failed_files)}")
        print("Please prioritize translating these key files")
        sys.exit(1)
    else:
        print("\n✅ Translation quality check passed")
        sys.exit(0)

if __name__ == "__main__":
    main()
