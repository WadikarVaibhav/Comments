from django.http import HttpResponse
from django.http import HttpResponseNotFound
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
        loggedInUser = getProfilePicture(request.GET.get('user', None));
        response = {
           'posts': postsList,
           'user': loggedInUser
        }

        response = json.dumps(response)

        return HttpResponse(response, content_type="application/json")

def getComments(request):
     if request.method == 'GET':
        parentId = request.GET.get('parentId', None);
        postId = request.GET.get('postId', None);
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

def getProfilePicture(username):
    user = Users.objects.filter(user_name = username).values_list('picture', flat=True).first()
    user = str(user);
    return user;

def getUserIdFromUsername(username):
    user = Users.objects.filter(user_name = username).values_list('user_id', flat=True).first()
    user = str(user);
    return user;

@csrf_exempt
def editComment(request):
    if request.method == 'POST':
        commentId = request.POST.get('commentId', None);
        postId = request.POST.get('postId', None);
        edit = request.POST.get('edit', None);
        username = request.POST.get('username', None);
        userId = getUserIdFromUsername(username);
        update = Comments.objects.filter(user_id = userId).filter(comment_id = commentId).update(comment = edit);
        parentId = request.POST.get('parentId', None);
        if update > 0:
            if parentId == '0':
                comments = Comments.objects.filter(post_id = postId).filter(parent_id__isnull=True).only('comment')
            else :
                comments = Comments.objects.filter(post_id = postId).filter(parent_id = parentId).only('comment')
            comments = serializers.serialize("json", comments)
            return HttpResponse(comments, content_type="application/json")
        else:
            return HttpResponseNotFound("not authorized to edit")

@csrf_exempt
def postComment(request):
    if request.method == 'POST':
        print ('here')
        parentId = request.POST.get('parentId', None);
        postId = request.POST.get('postId', None);
        postId = (int) (postId);
        parentId = (int) (parentId);
        comment = request.POST.get('comment', None);
        username = request.POST.get('user', None);
        data = Comments();
        data.comment = comment;
        userId = getUserIdFromUsername(username);
        userId = Users.objects.get(pk=userId);
        data.post_id = Posts.objects.get(pk=postId);
        if parentId != 0:
            data.parent_id = Comments.objects.get(comment_id = parentId);
        data.likes = 0;
        data.date_created = datetime.now();
        data.date_modified = datetime.now();
        data.user_id = userId;
        data.userFullName = getUserName(username);
        data.profile = getProfilePicture(username);
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
        password = request.GET.get('password', None);
        user = Users.objects.filter(user_name = username).filter(password = password)
        if user.count() > 0:
            return HttpResponse("success")
        else:
            return HttpResponseNotFound("login failed")
