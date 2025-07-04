from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate, logout
from django.contrib.auth.forms import UserCreationForm, AuthenticationForm
from django.http import JsonResponse
from django.contrib.auth.models import User
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST
from django.middleware.csrf import get_token
from datetime import datetime
import pytz

def index(request):
  
   
   # Timezone definitions
    londontz = pytz.timezone('Europe/London')
    tokyotz = pytz.timezone('Asia/Tokyo')
    newyorktz = pytz.timezone('America/New_York')

    # Get the current time in each timezone
    london = datetime.now(londontz).strftime('%H:%M')
    tokyo = datetime.now(tokyotz).strftime('%H:%M')
    newyork = datetime.now(newyorktz).strftime('%H:%M')

    # Pass the times to the template
    return render(request, 'index/index.html', {
        'user': request.user,
        'london': london,
        'tokyo': tokyo,
        'newyork': newyork
    })

@require_POST
def register_user(request):
    form = UserCreationForm(request.POST)
    if form.is_valid():
        user = form.save()
        login(request, user)
        return JsonResponse({'success': True, 'username': user.username})
    return JsonResponse({'success': False, 'errors': form.errors})

@require_POST
def login_user(request):
    form = AuthenticationForm(data=request.POST)
    if form.is_valid():
        user = form.get_user()
        login(request, user)
        return JsonResponse({'success': True, 'username': user.username})
    return JsonResponse({'success': False, 'errors': form.errors})


@require_POST
def logout_user(request):
    logout(request)
    return redirect('index')