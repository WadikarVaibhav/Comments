from django.http import HttpResponse
from django.http import JsonResponse
from django.core import serializers
import psycopg2
from .models import Posts, Users, Comments
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime
import json

def getPosts(request):
     if request.method == 'GET':
        postsList = Posts.objects.all();
        postsList = serializers.serialize("json", postsList)
        return HttpResponse(postsList, content_type="application/json")

def getComments(request):
     if request.method == 'GET':
        parentId = request.GET.get('parentId', None);
        postId = request.GET.get('postId', None);
        print('parent id: ');
        print(parentId);
        print('post id: ');
        print(postId);
        if parentId == '0':
            comments = Comments.objects.filter(post_id = postId).filter(parent_id__isnull=True).only('comment')
        else :
            comments = Comments.objects.filter(post_id = postId).filter(parent_id = parentId).only('comment')
        comments = serializers.serialize("json", comments)
        return HttpResponse(comments, content_type="application/json")

def getUserName(username):
    user =  Users.objects.filter(user_name = username).values_list('firstname', flat=True).first()
    firstname = str (user);
    user =  Users.objects.filter(user_name = username).values_list('lastname', flat=True).first()
    lastname = str(user);
    return firstname+' '+lastname;


@csrf_exempt
def postComment(request):
    if request.method == 'POST':
        parentId = request.POST.get('parentId', None);
        postId = request.POST.get('postId', None);
        postId = (int) (postId);
        parentId = (int) (parentId);
        comment = request.POST.get('comment', None);
        username = request.POST.get('user', None);
        data = Comments();
        data.comment = comment;
        userId = Users.objects.get(pk=3);
        data.post_id = Posts.objects.get(pk=postId);
        if parentId != 0:
            data.parent_id = Comments.objects.get(comment_id = parentId);
        data.likes = 0;
        data.date_created = datetime.now();
        data.date_modified = datetime.now();
        data.user_id = userId;
        data.userFullName = getUserName(username);
        data.save();
        return HttpResponse("success")

@csrf_exempt
def addNewUser(request):
    if request.method == 'POST':
        newUser = Users();
        newUser.firstname = request.POST.get('firstname', None);
        newUser.lastname = request.POST.get('lastname', None);
        newUser.emailId = request.POST.get('email', None);
        newUser.user_name = request.POST.get('username', None);
        newUser.password = request.POST.get('password', None);
        newUser.save();
        return HttpResponse("success")

def validateUser(request):
    if request.method == 'GET':
        username = request.GET.get('username', None);
        print ("username " + username);
        password = request.GET.get('password', None);
        print ("password "+ password);
        user = Users.objects.filter(user_name = username).filter(password = password)
        if user.count() > 0:
            print ("Hi");
            return HttpResponse("success")
        else:
            print ("Hi in fail");
            return HttpResponseNotFound("login failed")
