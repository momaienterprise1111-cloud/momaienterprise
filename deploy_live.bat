@echo off
title Deploying Momai Enterprise CRM to Cloudflare & GitHub...
cd /d "%~dp0"

echo ========================================================
echo  Deploying Momai Enterprise CRM to Live & GitHub
echo ========================================================
echo.

echo [1/3] Syncing latest assets to public folder...
node -e "const fs=require('fs'),path=require('path');if(!fs.existsSync('public'))fs.mkdirSync('public');['index.html','style.css','app.js','xlsx.full.min.js','logo.jpg','logo.svg','manifest.json','database.json'].forEach(f=>{if(fs.existsSync(f)){fs.copyFileSync(f,path.join('public',f));console.log(' -> Copied: ' + f);}});console.log('Public assets sync complete.');"

echo.
echo [2/3] Deploying to Cloudflare Workers...
call npx wrangler deploy

echo.
echo [3/3] Pushing updates to GitHub...
git add .
git commit -m "Live update: CRM features and latest assets"
git push origin main

echo.
echo ========================================================
echo  All updates successfully deployed to Live and GitHub!
echo ========================================================
pause
