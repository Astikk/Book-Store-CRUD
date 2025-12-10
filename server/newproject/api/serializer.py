# in model.py everything is defined by django but if weare going to be making REST apis
# calls we are probably going to be sending data in the format of JSON, so in order to accept
# that kind of data we need to create a serializer.

# create a function that is going to be used to tell django to turn out JSON data into this
# django model type.
from rest_framework import serializers
from .models import Book

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'
