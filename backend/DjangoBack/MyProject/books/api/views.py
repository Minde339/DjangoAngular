from django.shortcuts import render
from rest_framework import viewsets
from books.api.serializers import BookSerializer
from books.models import Book

class BookViewSet(viewsets.ModelViewSet):
    queryset = Book.objects.all()
    serializer_class = BookSerializer
# Create your views here.
