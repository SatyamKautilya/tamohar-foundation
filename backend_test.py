#!/usr/bin/env python3
"""
Comprehensive Backend API Tests for Tamohar Foundation NGO Website
Tests all backend APIs including authentication, content management, and form submissions.
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get base URL from environment
BASE_URL = "https://tamohar-foundation.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

# Test credentials
ADMIN_EMAIL = "admin@tamoharfoundation.org"
ADMIN_PASSWORD = "admin123"

# Global variables for test state
auth_token = None
test_results = []

def log_test(test_name, success, message, details=None):
    """Log test results"""
    result = {
        "test": test_name,
        "success": success,
        "message": message,
        "timestamp": datetime.now().isoformat(),
        "details": details
    }
    test_results.append(result)
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status}: {test_name} - {message}")
    if details and not success:
        print(f"   Details: {details}")

def test_health_check():
    """Test GET /api/health"""
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'ok' and 'timestamp' in data:
                log_test("Health Check API", True, "Health endpoint working correctly")
                return True
            else:
                log_test("Health Check API", False, "Invalid response format", data)
                return False
        else:
            log_test("Health Check API", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        log_test("Health Check API", False, f"Request failed: {str(e)}")
        return False

def test_content_api():
    """Test GET /api/content"""
    try:
        response = requests.get(f"{API_BASE}/content", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and data['data']:
                content = data['data']
                # Check for key sections
                required_sections = ['hero', 'about', 'programs', 'stats', 'team']
                missing_sections = [section for section in required_sections if section not in content]
                
                if not missing_sections:
                    log_test("Content API - Get All", True, "Content API working with all required sections")
                    return True
                else:
                    log_test("Content API - Get All", False, f"Missing sections: {missing_sections}")
                    return False
            else:
                log_test("Content API - Get All", False, "No content data returned", data)
                return False
        else:
            log_test("Content API - Get All", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        log_test("Content API - Get All", False, f"Request failed: {str(e)}")
        return False

def test_auth_login():
    """Test POST /api/auth/login"""
    global auth_token
    
    try:
        payload = {
            "email": ADMIN_EMAIL,
            "password": ADMIN_PASSWORD
        }
        
        response = requests.post(f"{API_BASE}/auth/login", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and 'token' in data['data'] and 'user' in data['data']:
                auth_token = data['data']['token']
                user = data['data']['user']
                if user.get('email') == ADMIN_EMAIL and user.get('role') == 'admin':
                    log_test("Auth Login API", True, "Login successful with valid token and user data")
                    return True
                else:
                    log_test("Auth Login API", False, "Invalid user data in response", user)
                    return False
            else:
                log_test("Auth Login API", False, "Invalid response format", data)
                return False
        else:
            log_test("Auth Login API", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        log_test("Auth Login API", False, f"Request failed: {str(e)}")
        return False

def test_auth_verify():
    """Test GET /api/auth/verify"""
    if not auth_token:
        log_test("Auth Verify API", False, "No auth token available")
        return False
        
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{API_BASE}/auth/verify", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and data['data'].get('email') == ADMIN_EMAIL:
                log_test("Auth Verify API", True, "Token verification successful")
                return True
            else:
                log_test("Auth Verify API", False, "Invalid user data", data)
                return False
        else:
            log_test("Auth Verify API", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        log_test("Auth Verify API", False, f"Request failed: {str(e)}")
        return False

def test_contact_form():
    """Test POST /api/contact"""
    try:
        payload = {
            "name": "Rahul Sharma",
            "email": "rahul.sharma@example.com",
            "phone": "+91-9876543210",
            "subject": "Volunteer Inquiry",
            "message": "I would like to volunteer for your education programs. Please let me know how I can contribute."
        }
        
        response = requests.post(f"{API_BASE}/contact", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and 'message' in data['data']:
                log_test("Contact Form API", True, "Contact form submission successful")
                return True
            else:
                log_test("Contact Form API", False, "Invalid response format", data)
                return False
        else:
            log_test("Contact Form API", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        log_test("Contact Form API", False, f"Request failed: {str(e)}")
        return False

def test_volunteer_registration():
    """Test POST /api/volunteer"""
    try:
        payload = {
            "name": "Priya Patel",
            "email": "priya.patel@example.com",
            "phone": "+91-9876543211",
            "skills": "Teaching, Community Outreach, Event Management",
            "availability": "Weekends and evenings",
            "motivation": "I want to contribute to education and women empowerment programs in rural areas."
        }
        
        response = requests.post(f"{API_BASE}/volunteer", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and 'message' in data['data']:
                log_test("Volunteer Registration API", True, "Volunteer registration successful")
                return True
            else:
                log_test("Volunteer Registration API", False, "Invalid response format", data)
                return False
        else:
            log_test("Volunteer Registration API", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        log_test("Volunteer Registration API", False, f"Request failed: {str(e)}")
        return False

def test_newsletter_subscription():
    """Test POST /api/newsletter"""
    try:
        payload = {
            "email": "newsletter.subscriber@example.com"
        }
        
        response = requests.post(f"{API_BASE}/newsletter", json=payload, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and 'message' in data['data']:
                log_test("Newsletter Subscription API", True, "Newsletter subscription successful")
                return True
            else:
                log_test("Newsletter Subscription API", False, "Invalid response format", data)
                return False
        else:
            log_test("Newsletter Subscription API", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        log_test("Newsletter Subscription API", False, f"Request failed: {str(e)}")
        return False

def test_content_update():
    """Test PUT /api/content/{section} (requires auth)"""
    if not auth_token:
        log_test("Content Update API", False, "No auth token available")
        return False
        
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        payload = {
            "data": {
                "title": "Updated Hero Title",
                "subtitle": "Updated Subtitle for Testing",
                "description": "This is a test update to verify the content update API is working correctly."
            }
        }
        
        response = requests.put(f"{API_BASE}/content/hero", json=payload, headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and 'message' in data['data']:
                log_test("Content Update API", True, "Content update successful")
                return True
            else:
                log_test("Content Update API", False, "Invalid response format", data)
                return False
        else:
            log_test("Content Update API", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        log_test("Content Update API", False, f"Request failed: {str(e)}")
        return False

def test_inquiries_api():
    """Test GET /api/inquiries (requires auth)"""
    if not auth_token:
        log_test("Inquiries API - Get All", False, "No auth token available")
        return False
        
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{API_BASE}/inquiries", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and isinstance(data['data'], list):
                log_test("Inquiries API - Get All", True, f"Retrieved {len(data['data'])} inquiries")
                return True
            else:
                log_test("Inquiries API - Get All", False, "Invalid response format", data)
                return False
        else:
            log_test("Inquiries API - Get All", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        log_test("Inquiries API - Get All", False, f"Request failed: {str(e)}")
        return False

def test_volunteers_api():
    """Test GET /api/volunteers (requires auth)"""
    if not auth_token:
        log_test("Volunteers API - Get All", False, "No auth token available")
        return False
        
    try:
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{API_BASE}/volunteers", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if 'data' in data and isinstance(data['data'], list):
                log_test("Volunteers API - Get All", True, f"Retrieved {len(data['data'])} volunteer applications")
                return True
            else:
                log_test("Volunteers API - Get All", False, "Invalid response format", data)
                return False
        else:
            log_test("Volunteers API - Get All", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        log_test("Volunteers API - Get All", False, f"Request failed: {str(e)}")
        return False

def test_inquiry_status_update():
    """Test PUT /api/inquiries/{id} (requires auth and existing inquiry)"""
    if not auth_token:
        log_test("Inquiry Status Update API", False, "No auth token available")
        return False
        
    try:
        # First get inquiries to find an ID to update
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{API_BASE}/inquiries", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            inquiries = data.get('data', [])
            
            if inquiries:
                inquiry_id = inquiries[0]['id']
                payload = {"status": "reviewed"}
                
                update_response = requests.put(f"{API_BASE}/inquiries/{inquiry_id}", 
                                             json=payload, headers=headers, timeout=10)
                
                if update_response.status_code == 200:
                    update_data = update_response.json()
                    if 'data' in update_data and 'message' in update_data['data']:
                        log_test("Inquiry Status Update API", True, "Inquiry status updated successfully")
                        return True
                    else:
                        log_test("Inquiry Status Update API", False, "Invalid response format", update_data)
                        return False
                else:
                    log_test("Inquiry Status Update API", False, f"HTTP {update_response.status_code}", update_response.text)
                    return False
            else:
                log_test("Inquiry Status Update API", True, "No inquiries to update (expected if no contact forms submitted)")
                return True
        else:
            log_test("Inquiry Status Update API", False, f"Failed to get inquiries: HTTP {response.status_code}")
            return False
            
    except Exception as e:
        log_test("Inquiry Status Update API", False, f"Request failed: {str(e)}")
        return False

def test_volunteer_status_update():
    """Test PUT /api/volunteers/{id} (requires auth and existing volunteer)"""
    if not auth_token:
        log_test("Volunteer Status Update API", False, "No auth token available")
        return False
        
    try:
        # First get volunteers to find an ID to update
        headers = {"Authorization": f"Bearer {auth_token}"}
        response = requests.get(f"{API_BASE}/volunteers", headers=headers, timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            volunteers = data.get('data', [])
            
            if volunteers:
                volunteer_id = volunteers[0]['id']
                payload = {"status": "approved"}
                
                update_response = requests.put(f"{API_BASE}/volunteers/{volunteer_id}", 
                                             json=payload, headers=headers, timeout=10)
                
                if update_response.status_code == 200:
                    update_data = update_response.json()
                    if 'data' in update_data and 'message' in update_data['data']:
                        log_test("Volunteer Status Update API", True, "Volunteer status updated successfully")
                        return True
                    else:
                        log_test("Volunteer Status Update API", False, "Invalid response format", update_data)
                        return False
                else:
                    log_test("Volunteer Status Update API", False, f"HTTP {update_response.status_code}", update_response.text)
                    return False
            else:
                log_test("Volunteer Status Update API", True, "No volunteers to update (expected if no applications submitted)")
                return True
        else:
            log_test("Volunteer Status Update API", False, f"Failed to get volunteers: HTTP {response.status_code}")
            return False
            
    except Exception as e:
        log_test("Volunteer Status Update API", False, f"Request failed: {str(e)}")
        return False

def run_all_tests():
    """Run all backend API tests"""
    print("=" * 80)
    print("TAMOHAR FOUNDATION NGO WEBSITE - BACKEND API TESTS")
    print("=" * 80)
    print(f"Testing against: {API_BASE}")
    print(f"Started at: {datetime.now().isoformat()}")
    print("=" * 80)
    
    # Test sequence - authentication first, then other APIs
    tests = [
        ("Health Check", test_health_check),
        ("Content API", test_content_api),
        ("Auth Login", test_auth_login),
        ("Auth Verify", test_auth_verify),
        ("Contact Form", test_contact_form),
        ("Volunteer Registration", test_volunteer_registration),
        ("Newsletter Subscription", test_newsletter_subscription),
        ("Content Update (Admin)", test_content_update),
        ("Inquiries API (Admin)", test_inquiries_api),
        ("Volunteers API (Admin)", test_volunteers_api),
        ("Inquiry Status Update", test_inquiry_status_update),
        ("Volunteer Status Update", test_volunteer_status_update),
    ]
    
    passed = 0
    failed = 0
    
    for test_name, test_func in tests:
        print(f"\n--- Running {test_name} ---")
        try:
            if test_func():
                passed += 1
            else:
                failed += 1
        except Exception as e:
            log_test(test_name, False, f"Test execution failed: {str(e)}")
            failed += 1
    
    # Summary
    print("\n" + "=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"Total Tests: {passed + failed}")
    print(f"Passed: {passed}")
    print(f"Failed: {failed}")
    print(f"Success Rate: {(passed / (passed + failed) * 100):.1f}%" if (passed + failed) > 0 else "0%")
    
    if failed > 0:
        print("\nFAILED TESTS:")
        for result in test_results:
            if not result['success']:
                print(f"  ❌ {result['test']}: {result['message']}")
    
    print(f"\nCompleted at: {datetime.now().isoformat()}")
    print("=" * 80)
    
    return passed, failed

if __name__ == "__main__":
    try:
        passed, failed = run_all_tests()
        
        # Exit with appropriate code
        if failed > 0:
            print(f"\n⚠️  {failed} test(s) failed. Check the output above for details.")
            sys.exit(1)
        else:
            print(f"\n✅ All {passed} tests passed successfully!")
            sys.exit(0)
            
    except KeyboardInterrupt:
        print("\n\nTests interrupted by user.")
        sys.exit(1)
    except Exception as e:
        print(f"\n\nUnexpected error: {str(e)}")
        sys.exit(1)