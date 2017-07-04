from django.shortcuts import render
from django.template import loader
from django.http import HttpResponse
from .models import Posts, Users, Comments

def getPosts(request):
    posts = Posts.objects.all();
    template = loader.get_template('index.html')
    context = {
        'posts': posts
    }
    return HttpResponse(template.render(context, request))
