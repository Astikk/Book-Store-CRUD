from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Book
from .serializer import BookSerializer


@api_view(['GET'])
def get_books(request):
    # get all of the entried from a model
    books = Book.objects.all()
    serializeData = BookSerializer(books, many=True).data
    return Response(serializeData)

@api_view(['POST'])
def create_book(request):
    data = request.data
    serialize = BookSerializer(data=data)
    if serialize.is_valid():
        serialize.save()
        return Response(serialize.data, status=status.HTTP_201_CREATED)
    return Response(serialize.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PUT', 'DELETE'])
def book_detail(request, pk):
    try:
        book = Book.objects.get(pk=pk)
    except Book.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'DELETE':
        book.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    elif request.method == "PUT":
        data = request.data
        serialize = BookSerializer(book, data=data)
        if serialize.is_valid():
            serialize.save()
            return Response(serialize.data)
        return Response(serialize.errors, status= status.HTTP_400_BAD_REQUEST)
    