import decimal
import json
from argparse import ArgumentParser

import yaml
from nerium import Query, ResultFormat


def serialize(obj):
    """Convert dates/times to isoformat, decimals to strings, for use by JSON formatter"""
    if hasattr(obj, 'isoformat'):
        return obj.isoformat()
    elif isinstance(obj, decimal.Decimal):
        return str(obj)
    else:
        return str(obj)


def multi_to_dict(obj):
    """Convert multidict to dict, consolidating values
       into list for repeated keys
    """
    if hasattr(obj, 'getall'):
        new_dict = {
            key: (obj.getall(key)
                  if len(obj.getall(key)) > 1 else obj.get(key))
            for key in obj.keys()
        }
        return new_dict
    else:
        return dict(obj)


def generate_resultset(query_name, format_='default', query_params={}):
    query = Query(query_name, **query_params)
    query_result = query.result_set()
    formatter = ResultFormat(query_result, format_)
    formatted_result = formatter.formatted_results()
    return json.dumps(formatted_result, default=serialize)


def main():
    parser = ArgumentParser()
    parser.add_argument('--config', default='nerium-static-config.yaml')
    config_file = parser.parse_args().config
    with open(config_file) as conf:
        config = yaml.load(conf.read())
    query_name = config['query_name']
    try:
        format_ = config['format']
    except KeyError:
        format_ = 'default'
    try:
        query_params = config['query_params']
    except KeyError:
        query_params = {}
    try:
        output_name = config['output_name']
    except KeyError:
        output_name = query_name
    resultset = generate_resultset(
        query_name=query_name,
        format_=format_,
        query_params=query_params
        )
    output_file = 'public/{}.json'.format(output_name)
    with open(output_file, 'w') as result_out:
        result_out.write(resultset)


if __name__ == '__main__':
    main()
