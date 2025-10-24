#!/bin/bash

# GitHub Repository Setup Script for Atwood Machine Simulation
# This script will help you create a GitHub repository and push your code

echo "========================================="
echo "GitHub Repository Setup"
echo "========================================="
echo ""

# Check if gh CLI is installed
if command -v gh &> /dev/null; then
    echo "✓ GitHub CLI (gh) is installed"
    echo ""
    
    # Check if user is authenticated
    if gh auth status &> /dev/null; then
        echo "✓ You are authenticated with GitHub"
        echo ""
        
        # Prompt for repository details
        read -p "Enter repository name (default: atwood-machine-simulation): " repo_name
        repo_name=${repo_name:-atwood-machine-simulation}
        
        read -p "Repository description (default: Interactive HTML5 Atwood Machine physics simulation): " repo_desc
        repo_desc=${repo_desc:-"Interactive HTML5 Atwood Machine physics simulation"}
        
        read -p "Make repository public? (Y/n): " is_public
        is_public=${is_public:-Y}
        
        if [[ $is_public =~ ^[Yy]$ ]]; then
            visibility="--public"
        else
            visibility="--private"
        fi
        
        # Create the repository
        echo ""
        echo "Creating GitHub repository: $repo_name"
        gh repo create "$repo_name" $visibility --description "$repo_desc" --source=. --remote=origin --push
        
        echo ""
        echo "========================================="
        echo "✓ Repository created successfully!"
        echo "========================================="
        echo ""
        echo "Your repository is available at:"
        gh repo view --web
        
    else
        echo "⚠ You are not authenticated with GitHub CLI"
        echo ""
        echo "Please run: gh auth login"
        echo "Then run this script again."
    fi
else
    echo "⚠ GitHub CLI (gh) is not installed"
    echo ""
    echo "Option 1: Install GitHub CLI"
    echo "  Visit: https://cli.github.com/"
    echo "  Or run: brew install gh"
    echo ""
    echo "Option 2: Create repository manually"
    echo "  1. Go to https://github.com/new"
    echo "  2. Create a new repository named 'atwood-machine-simulation'"
    echo "  3. Don't initialize with README (we already have one)"
    echo "  4. Then run these commands:"
    echo ""
    echo "     cd '/Users/vladimir.lopez/Desktop/AI/Physics Simulations/Atwood Machine'"
    echo "     git remote add origin https://github.com/YOUR_USERNAME/atwood-machine-simulation.git"
    echo "     git branch -M main"
    echo "     git push -u origin main"
fi

echo ""
