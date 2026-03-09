import os
import re

NEW_COLOR_LOWER = '#31275c'
NEW_COLOR_UPPER = '#31275C'

modified = 0

for root, dirs, files in os.walk('.'):
    # Skip build/source control dirs
    dirs[:] = [d for d in dirs if d not in ('node_modules', '.next', '.git', 'brain')]
    
    for file in files:
        if file.endswith(('.js', '.jsx', '.css', '.json', '.md')):
            filepath = os.path.join(root, file)
            
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                    
                if re.search(r'#7c3aed', content, re.IGNORECASE):
                    # Replace lowercase
                    new_content = re.sub(r'#7c3aed', NEW_COLOR_LOWER, content)
                    # Replace uppercase
                    new_content = re.sub(r'#7C3AED', NEW_COLOR_UPPER, new_content)
                    
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    
                    modified += 1
                    print(f"Updated: {filepath}")
            except Exception as e:
                print(f"Skipped {filepath}: {e}")

print(f"Replacement complete! Modified {modified} files.")
