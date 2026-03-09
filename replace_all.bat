@echo off
echo Starting replacement script...
powershell -ExecutionPolicy Bypass -Command "$files = Get-ChildItem -Path . -Recurse -File -Include *.css,*.js,*.jsx,*.json,*.md | Where-Object { $_.FullName -notmatch '\\node_modules\\' -and $_.FullName -notmatch '\\.next\\' -and $_.FullName -notmatch '\\.git\\' -and $_.FullName -notmatch '\\brain\\' }; foreach ($f in $files) { $content = Get-Content $f.FullName -Raw; if ($content -match '(?i)#7c3aed') { $content = $content -replace '(?i)#7c3aed', '#31275C'; Set-Content -Path $f.FullName -Value $content -NoNewline; Write-Host 'Updated: ' $f.FullName } }"
echo Done.
